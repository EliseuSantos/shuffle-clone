# Shuffle Clone - Nubank Inspired

This project aims to create a clone of "Shuffle," Nubank's internal tool that enhances customer service, based on the article [Designing Shuffle](https://building.nubank.com.br/pt-br/projetando-o-shuffle-a-ferramenta-interna-que-fomenta-o-premiado-servico-ao-cliente-do-nubank/).

## Technologies Used

The project leverages a set of modern technologies to ensure modularity, performance, and scalability:

### Microfrontends
- **single-spa**: Main framework to manage microfrontends.

### Frontend Frameworks
- **React**
- **Solid**
- **Vue**
- **Angular**

### Backend
- **NestJS**: To build the API and services required for frontend integration.

### NX Monorepo
- A powerful build system to manage and scale the project efficiently.

### Directory Description

- **packages/**: Contains the main applications (frontend and backend).
- **libs/**: Shared libraries for reusability across applications.
- **tools/**: Custom scripts and utilities for project management.

## Shuffle Clone Features
- **Queue Management**: Intelligent distribution of tasks among different teams.
- **Custom Interface**: Different frameworks to address specific use cases.
- **Backend Integration**: Robust API for efficient communication.
- **Modularity**: Microfrontend implementation for scalability and team independence.

## How to Run the Project

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd shuffle-clone
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the applications:
   ```bash
   pnpm dev
   ```

   Each application can be served individually or in parallel.

4. Access the applications in the browser as needed.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

