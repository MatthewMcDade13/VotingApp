module app.services
{
    import IpAdress = app.models.IpAdress;
   
    export class IpService
    {
        //Iterates through Ip adresses,
        //Returns false if passed in IP string matches anything
        //in the array of ip Adresses. True if none match
        checkIp(adresses: Array<IpAdress>, ip: string )
        {
            for (let i = 0; i < adresses.length; i++)
            {
                if (adresses[i].adress === ip)
                {
                    return false;
                }
            }

            return true;
        }
    }

    angular.module("VotingApp").service("IpService", IpService);
}