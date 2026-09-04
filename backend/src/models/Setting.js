const { read, write } = require("../utils/jsonStore");
const Setting = {
  all() { return read("settings"); },
  findByUserId(userId) { return this.all().find(x=>x.userId===userId); },
  create(data) { const a=this.all();a.push(data);write("settings",a);return data; },
  update(id,patch) { const a=this.all(),i=a.findIndex(x=>x.id===id);if(i<0)return null;a[i]={...a[i],...patch};write("settings",a);return a[i]; }
};
module.exports=Setting;
