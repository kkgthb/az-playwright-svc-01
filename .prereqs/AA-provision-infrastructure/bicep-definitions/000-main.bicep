targetScope = 'subscription'

var location = 'eastus'
param solutionName string // Taken care of in .bicepparams files
param envNickname string // Taken care of in .bicepparams files

resource rg 'Microsoft.Resources/resourceGroups@2022-09-01' = {
  name: '${solutionName}-rg-${envNickname}'
  location: location
}

module sw './200-playwrighttestingservice.bicep' = {
  name: '${solutionName}-ps-${envNickname}'
  scope: resourceGroup(rg.name)
  params: {
    psName: '${solutionName}ps${envNickname}'
    location: location
  }
}
