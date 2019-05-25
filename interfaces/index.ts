// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

// tslint:disable-next-line
declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}

declare interface IRequestError {
  message: string
  status: number
}

declare module '*.scss' {
  const content: any
  export default content
}

declare var process : {
  env: {
    [key: string]: string
  }
}

declare module 'Types'