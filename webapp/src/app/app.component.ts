import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  data = {"nonce": 0, "gasprice": 0, "startgas": 90000, "to":
  {"address": "0x77979aa4a3e279261e1bd6857892b6cbe9b30e7a",
  "tx_history": [{"value": 0.009, "from": "0x77979aa4a3e279261e1bd6857892b6cbe9b30e7a",
  "to": "0x7d99a60a4994ecde2822ae3eb48dc76e09b463a0", "blockNum": "5079756",
  "hash": "0x9d8a89db040e69ad6364641e43c091e180929f459205f6daf1aec9d9856a160a", "timestamp": "1518480728"},
  {"value": 0.008, "from": "0x77979aa4a3e279261e1bd6857892b6cbe9b30e7a", "to": "0x77979aa4a3e279261e1bd6857892b6cbe9b30e7a",
   "blockNum": "5079752", "hash": "0xf9fc65d270ec470fff0c8704f5db6a8df845dff99b3bb98409d55f6d3a9fb7c7",
   "timestamp": "1518480606"}, {"value": 0.001, "from": "0x77979aa4a3e279261e1bd6857892b6cbe9b30e7a",
   "to": "0x77979aa4a3e279261e1bd6857892b6cbe9b30e7a", "blockNum": "5079748",
    "hash": "0x8cf57adb48baa109987d1ffcf53f9a0d0a30c2ff8c2b3ad8f0d0f2b0126b3a9b",
     "timestamp": "1518480522"},
     {"value": 0.01, "from": "0x32be343b94f860124dc4fee278fdcbd38c102d88", "to": "0x77979aa4a3e279261e1bd6857892b6cbe9b30e7a",
      "blockNum": "4997745", "hash": "0xbfea9198e5e07f61b6539ff0fbb62332688ab9562fcc9d87cb68a2dd522248e2",
       "timestamp": "1517285512"}]}, "value": 0.0001, "data": "0x436f6e677261747321",
       "v": 27, "r": 97418512173558214872840979077663446230246702025029572894075185978586751176281,
        "s": 13933688731259317383521920912135026116207253136503724698284564889925538850014,
        "sender": {"address": "0x77979aa4a3e279261e1bd6857892b6cbe9b30e7a", "tx_history":
         [{"value": 0.009, "from": "0x77979aa4a3e279261e1bd6857892b6cbe9b30e7a",
          "to": "0x7d99a60a4994ecde2822ae3eb48dc76e09b463a0", "blockNum": "5079756",
           "hash": "0x9d8a89db040e69ad6364641e43c091e180929f459205f6daf1aec9d9856a160a", "timestamp": "1518480728"},
           {"value": 0.008, "from": "0x77979aa4a3e279261e1bd6857892b6cbe9b30e7a",
            "to": "0x77979aa4a3e279261e1bd6857892b6cbe9b30e7a", "blockNum": "5079752",
             "hash": "0xf9fc65d270ec470fff0c8704f5db6a8df845dff99b3bb98409d55f6d3a9fb7c7",
              "timestamp": "1518480606"}, {"value": 0.001, "from": "0x77979aa4a3e279261e1bd6857892b6cbe9b30e7a",
              "to": "0x77979aa4a3e279261e1bd6857892b6cbe9b30e7a", "blockNum": "5079748",
              "hash": "0x8cf57adb48baa109987d1ffcf53f9a0d0a30c2ff8c2b3ad8f0d0f2b0126b3a9b", "timestamp": "1518480522"},
              {"value": 0.01, "from": "0x32be343b94f860124dc4fee278fdcbd38c102d88",
              "to": "0x77979aa4a3e279261e1bd6857892b6cbe9b30e7a", "blockNum": "4997745",
               "hash": "0xbfea9198e5e07f61b6539ff0fbb62332688ab9562fcc9d87cb68a2dd522248e2", "timestamp": "1517285512"}]},
                "hash": "0x1b3d4b758ab98ad69499776cb7f3efcf9ca399dbf5374fa2d17c55bffdef1cff"}


    nonce = this.data.nonce;
    gasPrice = this.data.gasprice;
    startGas = this.data.startgas;
    toAddress = this.data.to.address;
    fromAdress = this.data.sender.address;
    ether = this.data.value;
}
