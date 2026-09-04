const { read, write } = require("../utils/jsonStore");
const Payment = {
  all() { return read("payments"); },
  findById(id) { return this.all().find(x=>x.id===id); },
  create(data) { const a=this.all();a.push(data);write("payments",a);return data; },
  update(id,patch) { const a=this.all(),i=a.findIndex(x=>x.id===id);if(i<0)return null;a[i]={...a[i],...patch};write("payments",a);return a[i]; },
  delete(id) { const a=this.all(),n=a.filter(x=>x.id!==id);if(n.length===a.length)return false;write("payments",n);return true; }
};
module.exports=Payment;
