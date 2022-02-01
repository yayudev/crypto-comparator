# Crypto comparator

Crypto prices monitoring app created using react and typescript.

Used libraries:

- react-router (routing)
- date-fns (date-handling)
- nivo (line charts)

## Running

App was generated with CRA so you can use the usual scripts for building and running it.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Testing

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Project structure

This project is structured based on modules and submodules.

A module represents a full feature (login, navbar, comparator) and a submodule is a smaller part of a module that can be isolated from the rest of the module.

Each module/submodule has different files.

- `{name}.view.tsx`. View component, intended to be used as a route and handles side-effects (like API calls).
- `{name}.component.tsx`. Regular component, usually self-contained and without side-effects.
- `{name}.styles.css`. CSS styles.
- `{name}.constants.ts`. Constants for configuration, isolated so it can be replaced easily if required.
- `{name}.service.ts`. Service classes for handling side effects.
- `{name}.utils.ts`. Utility helpers.
- `{name}.{type}.spec.tsx`. Testing for the a specific file.

## TODO

- [ ] Add more tests
- [ ] E2E Tests
- [ ] Handle error states
- [ ] Improve login -> comparator animations

## License

MIT
