targetScope = 'resourceGroup'

param psName string
param location string

resource symbolicname 'Microsoft.AzurePlaywrightService/accounts@2024-12-01' = {
  location: location
  name: psName
  properties: {
    localAuth: 'Disabled'
    regionalAffinity: 'Disabled'
    reporting: 'Enabled'
    scalableExecution: 'Enabled'
  }
}
