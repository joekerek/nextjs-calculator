import { evaluateInput } from "../../lib/arithmetic";

describe('evaluateInput', function() {
  it('Evaluates simple expression correctly', function() {
    const result = evaluateInput(['5', '+', '5']);
    expect(result).toEqual(10);
  })
  it('Evaluates complex expression correctly', function() {
    const result = evaluateInput(['(','5','*','2',')', '/', '2', '+', '(','33', '/', '3',')']);
    expect(result).toEqual(16);
  })
})