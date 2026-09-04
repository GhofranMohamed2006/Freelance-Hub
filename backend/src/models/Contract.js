const { read, write } = require("../utils/jsonStore");
const Contract = {
  all() { return read("contracts"); },
  findById(id) { return this.all().find(x=>x.id===id); },
  create(data) { const a=this.all();a.push(data);write("contracts",a);return data; },
  update(id,patch) { const a=this.all(),i=a.findIndex(x=>x.id===id);if(i<0)return null;a[i]={...a[i],...patch};write("contracts",a);return a[i]; },
  delete(id) { const a=this.all(),n=a.filter(x=>x.id!==id);if(n.length===a.length)return false;write("contracts",n);return true; }
};
module.exports=Contract;
