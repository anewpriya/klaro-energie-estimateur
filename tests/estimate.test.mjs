import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const script=fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script);
const source=script.slice(script.indexOf('function fmt'),script.indexOf("$('formCard').addEventListener"));
const {estimate,chequeEnergieAmount}=vm.runInNewContext(source+';({estimate,chequeEnergieAmount})');
const base={contractType:'regulated',surface:65,householdSize:1,income:0,heating:'electric'};
assert.equal(estimate(base).chequeAmount,194);
assert.ok(Math.abs(estimate(base).contractSaving-202.8)<1e-8);
assert.equal(estimate({...base,contractType:'unknown'}).contractSaving,null);
assert.equal(estimate({...base,contractType:'market'}).contractSaving,null);
for(const [uc,amounts] of [[1,[194,146,98,48,0]],[1.5,[240,176,113,63,0]],[2.1,[277,202,126,76,0]]]){
  [0,5700,6800,7850,11000].forEach((rfr,i)=>assert.equal(chequeEnergieAmount(rfr,uc),amounts[i]));
}
assert.throws(()=>estimate({...base,income:-1}));
assert.throws(()=>estimate({...base,surface:0}));
assert.throws(()=>estimate({...base,householdSize:1.5}));
console.log('Estimator checks passed');
