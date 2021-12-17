import { BigInt } from "@graphprotocol/graph-ts"
import {
  ScaleCapacity,
  MintBatchEvent
} from "../generated/ScaleCapacity/ScaleCapacity"
import { ScaleCapacityEntity } from "../generated/schema"

export function handleBatchMint(event: MintBatchEvent): void {
  // // Entities can be loaded from the store using a string ID; this ID
  // // needs to be unique across all entities of the same type

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  for(let i = 0 ; i < event.params.tokenIDs.length ; i ++) {
    let entity = new ScaleCapacityEntity(event.params.urls[i])
    entity.tokenID = event.params.tokenIDs[i];
    entity.address = event.params.to.toHexString();
    entity.save();
  }
}