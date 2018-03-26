import {fetchGet as fetchGetRaw} from '@ali/uniform-react-components/lib/UniFetch/index';

class IO {
   static findUserByKeyword(data){
     return fetchGet('/findUsers.json',data);
   }
}

function fetchGet(url, data, params) {
  return fetchGetRaw(url, data, params);
}


export default IO;