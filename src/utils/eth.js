import triptcipContractAbi from '../contracts/triptcip.abi.json'
import { Contract, ethers } from 'ethers'
import * as config from '../config'

export const provider = new ethers.providers.InfuraProvider(
  config.CHAIN_NAME,
  config.INFURA_PROJECT_ID
)

export const contractTriptcip = new Contract(
  config.CONTRACT_ADDRESS,
  triptcipContractAbi,
  provider
)

export const contractTriptcipABIInterface = new ethers.utils.Interface(triptcipContractAbi)
