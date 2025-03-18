# **Budgeter App Frontend**
 
 A simple budgeting app to track income and expenses

## **Features**

- **Expense & Income Visualisation** - View your financial trends using charts.

- **Weekly Summaries** - Get a breakdown of your weekly spending habits.

- **Add & Remove Transactions** - To easily manage and categorise financial records.

- **Transaction filtering** - Quickly find specific transactions based on tags and notes.

 ## **Tech stack**

 - **Frontend:** React, TailwindCSS, TypeScript

 - **Frontend Libraries:** chart.js, react-icons

 - **Code formating:** prettier

 - **Backend:** Connected to a separate repo [here](https://github.com/JC33340/budget-backend)

 - **Deployment:** Deployed on Railway [here](https://budget-frontend-production.up.railway.app)

## **File structure**

```
/src
  ├── components/ # Page components     
  ├── pages/      # Page layouts      
  ├── utils/      # Utility functions and helpers
  ├── types/      # TypeScript interfaces and types
```

 ## **Installation and setup**

1. Clone the repo

    ```
    git clone https://github.com/JC33340/budget-frontend.git
    cd budget-frontend
    ```

2. Install dependencies

    ```
    npm i
    ```

3. Create a .env file and add

    ```
    VITE_BACKEND_URL = {deployed_backend_url}
    ```

4. Start development Server

    ```
    npm run dev
    ```