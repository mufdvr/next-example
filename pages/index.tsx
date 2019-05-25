import * as React from 'react'

import { MainLayout } from 'components'
import { gitForksContainers } from 'features/gitForks'

const Index: React.FC = () => (
   <MainLayout>
      <gitForksContainers.GitForksLayout />
   </MainLayout>
)

export default Index