import { BigInt } from "@graphprotocol/graph-ts"
import {
  ScaleCapacity,
  MintBatchEvent
} from "../generated/ScaleCapacity/ScaleCapacity"
import { ScaleCapacityEntity } from "../generated/schema"

export function handleBatchMint(event: MintBatchEvent): void {
  // // Entities can be loaded from the store using a string ID; this ID
  // // needs to be unique across all entities of the same type
  let entity = ScaleCapacityEntity.load(event.params.to.toHexString())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ScaleCapacityEntity(event.params.to.toHexString())
  }
  let tokenID = [] as BigInt[];
  // Entity fields can be set based on event parameters
  for(let i = 0 ; i < event.params.tokenIDs.length ; i ++) {
    tokenID.push(event.params.tokenIDs[i]);
  }
  entity.tokenIDs = tokenID;
  entity.urls = event.params.urls;
  // Entities can be written to the store with `.save()`
  entity.save()
}