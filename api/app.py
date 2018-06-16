from chalice import Chalice, AuthResponse, BadRequestError
import boto3
from boto3.dynamodb.conditions import Key, Attr
from ethereum.transactions import Transaction
from rlp import decode
import requests

password = 'ethereum123'
app = Chalice(app_name='tx_api')

dynamodb = boto3.resource('dynamodb')
dynamodb_client = boto3.client('dynamodb')

tableName = 'addresses'
existingTables = dynamodb_client.list_tables()['TableNames']
if tableName not in existingTables:
    dynamodb_client.create_table(
        AttributeDefinitions=[
            {
                'AttributeName': 'address',
                'AttributeType': 'S',
            }
        ],
        KeySchema=[
            {
                'AttributeName': 'address',
                'KeyType': 'HASH',
            }
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5,
        },
        TableName=tableName,
    )

addresses = dynamodb.Table('addresses')

@app.authorizer()
def auth(auth_request):
    token = auth_request.token
    if token == password:
        return AuthResponse(routes=['/getTxData','/addresses'], principal_id='user')
    else:
        return AuthResponse(routes=[], principal_id='user')


@app.route('/getTxData', cors=True, authorizer=auth)
def getTxData():

    params = app.current_request.query_params

    if 'raw_transaction' in (params or {}):


        data = params['raw_transaction']

        transaction = decode(bytearray.fromhex(data[2:]), Transaction)

        txDict = transaction.to_dict()

        if txDict['value']/1e+18 < 5:
            value = str(txDict['value']/1e+18) + ' Ether'
        else:
            value = str(int(round(float(txDict['value'])/1e+18,0))) + ' Ether'

        txDict['value'] = value



        response = addresses.query(KeyConditionExpression=Key('address').eq(txDict['to']))
        if response['Count'] > 0:
            toNickname = response["Items"][0]["nickname"]
        else:
            toNickname = None
        txDict['to'] = {'address': txDict['to'], 'nickname': toNickname} #, 'tx_history': getTransactionHistory(txDict['to'])}

        response = addresses.query(KeyConditionExpression=Key('address').eq(txDict['sender']))
        if response['Count'] > 0:
            senderNickname = response["Items"][0]["nickname"]
        else:
            senderNickname = None

        txDict['sender'] = {'address': txDict['sender'], 'nickname': senderNickname} #, 'tx_history': getTransactionHistory(txDict['sender'])}
        txDict['data'] = transaction.data.decode()
        return txDict
    else:
        raise BadRequestError('raw_transaction not in query params')

@app.route('/addresses',authorizer=auth,cors=True)
def getAddresses():
    response = addresses.scan()
    if 'Items' in response:
        return response['Items']
    else:
        return []

@app.route('/addresses/{address}', methods = ['POST'], cors=True)
def hello_name(address):

    request = app.current_request

    if request.method == 'POST':

        body = request.json_body

        if 'nickname' in (body or {}):
            addresses.put_item(
               Item={
                    'address': address,
                    'nickname': body['nickname']
                }
            )
            return {'success':'added record to database'}
        else:
            raise BadRequestError('Unable to add record to database')

@app.route('/getTxHistory',cors=True)
def transaction_history():

    params = app.current_request.query_params
    transactionHistory = []

    if 'address' not in (params or {}):
        raise BadRequestError('address not in query params')

    else:
        address = params['address']

        apiUrl = 'https://api.etherscan.io/api'
        apiKey = 'IRR82YQGMGQNWDMHJJTFSTRMK5YNST6Q65'
        data = {'module':'account',
                'action':'txlist',
                'address':address,
                'startblock':0,
                'endblock':99999999,
                'page':1,
                'offset':10,
                'sort':'desc',
                'apikey': apiKey}

        r = requests.get(apiUrl,data=data)


        if r.json()['status'] == '1':
            for transaction in r.json()['result']:
                tx = {}
                if all(field in transaction for field in ['value','to','from']):

                    if float(transaction['value'])/1e+18 < 5:
                        tx['value'] = str(float(transaction['value'])/1e+18) + ' Ether'
                    else:
                        tx['value'] = str(int(round(float(transaction['value'])/1e+18,0))) + ' Ether'

                    tx['from'] = transaction['from']
                    tx['to'] = transaction['to']

                transactionHistory.append(tx)

    return transactionHistory
