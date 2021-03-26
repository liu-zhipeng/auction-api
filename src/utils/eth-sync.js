import { ethers } from 'ethers'
import { provider, contractTriptcip } from './eth'
import EthTokenAuctionsModel from '../models/EthTokenAuctions'
import SettingsModel from '../models/Settings'


export const startSync =  async () => {
    let settings = await SettingsModel
        .findOne()
        .exec()

    const lastBlockNumberSynced = settings.lastBlockNumberSynced;

    setInterval(() => {
        provider.getBlockNumer().then(async (blocknumber) => {
            
            settings.lastBlockNumberSynced = blocknumber;
            await settings.save();


            if(lastBlockNumberSynced <= blocknumber){
                console.log(`New block received, Number: ${lastBlockNumberSynced} - ${blocknumber}`);

                // sync CreateToken Event
                const createTokenEvents = await contractTriptcip.queryFilter('CreateToken', { fromBlock: lastBlockNumberSynced - 1, toBlock: blocknumber - 1 });

                createTokenEvents.forEach(event => {
                    if(!event.removed) {
                        var owner = event.args[1];
                        var tokenId = ethers.utils.BigNumber(event.args[2]).toNumber();
                    }
                });
               
                // sync AuctionCreate Event
                const auctionCreateEvents = await contractTriptcip.queryFilter('AuctionCreate', { fromBlock: lastBlockNumberSynced - 1, toBlock: blocknumber - 1 });

                auctionCreateEvents.forEach(event => {
                    if(!event.removed) {
                        var owner = event.args[1];
                        var tokenId = ethers.utils.BigNumber(event.args[2]).toNumber();
                        var reservePrice = ethers.utils.BigNumber(event.args[3]).toNumber();

                        // save auction
                    }
                });

                // sync AuctionCreate Event
                const auctionPlaceBidEvents = await contractTriptcip.queryFilter('AuctionPlaceBid', { fromBlock: lastBlockNumberSynced - 1, toBlock: blocknumber - 1 });

                auctionPlaceBidEvents.forEach(event => {
                    if(!event.removed) {
                        var owner = event.args[1];
                        var tokenId = ethers.utils.BigNumber(event.args[2]).toNumber();
                        var amount = ethers.utils.BigNumber(event.args[3]).toNumber();
                        var deadline = ethers.utils.BigNumber(event.args[4]).toNumber();

                        // save auction
                    }
                });

                // sync AuctionClaim Event
                const auctionClaimEvents = await contractTriptcip.queryFilter('AuctionClaim', { fromBlock: lastBlockNumberSynced - 1, toBlock: blocknumber - 1 });

                auctionClaimEvents.forEach(event => {
                    if(!event.removed) {
                        var owner = event.args[1];
                        var tokenId = ethers.utils.BigNumber(event.args[2]).toNumber();
                        var amount = ethers.utils.BigNumber(event.args[3]).toNumber();
                        var deadline = ethers.utils.BigNumber(event.args[4]).toNumber();

                        // save auction
                    }
                });

            }
        })
    }, 2000);
}