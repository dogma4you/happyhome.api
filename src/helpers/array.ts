import { Contract } from "src/models/contracts.model";

export function concatContracts (arr1: Contract[], arr2: Contract[]): Contract[] {
    const result: Contract[] = []
    const uniqueIds = new Set<number>();

    arr1.forEach(contract => {
        if (!uniqueIds.has(contract.id)) {
          result.push(contract);
          uniqueIds.add(contract.id);
        }
      });
      
      arr2.forEach(contract => {
        if (!uniqueIds.has(contract.id)) {
          result.push(contract);
          uniqueIds.add(contract.id);
        }
      });

    return result;
}