import * as React from 'react'
import { Subject } from 'rxjs'
import { StateObservable, ActionsObservable } from 'redux-observable'

import { MainLayout } from 'components'
import { gitForksContainers } from 'features/gitForks'
import rootEpic from 'features/gitForks/epics'
import * as actions from 'features/gitForks/actions'
import services from 'services'

class Index extends React.Component {

   static getInitialProps = async function ({ store, isServer, query }: any) {
      const state$ = new StateObservable(new Subject(), store.getState())
      const resultAction = await rootEpic(
        ActionsObservable.of(actions.fetchForks.request({ ...query, isServer })),
        state$,
        services
      ).toPromise() // we need to convert Observable to Promise
      store.dispatch(resultAction)
      return { isServer }
    }

   render = () => (
   <MainLayout>
      <gitForksContainers.GitForksLayout />
   </MainLayout>
   )
}

export default Index