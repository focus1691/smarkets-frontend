This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1) Start a local Postgres database

2) Run the Python API:

```bash
python3 main.py
```

3) Create `.env` / `.env.local` with the server api:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4) Run the development server:

```bash
npm run dev
# or
yarn dev
```

## Development

I decided to go with next.js because it can be useful if we want to extend the functionality later and add more advanced API request logic. CRA would be sufficient, however. Material UI is my go to UI framework because it has a lot of well-designed components that make it easy to build a dialog, collapsible view, and other features.

I started the project by building a frontend and displaying some dummy data. I wasn't fully clear on all the fields of the contract, market, and event, and I didn't want to overly complicate it, so I made the schemas simple. The initial work helped me to understand what schema to create, and I moved onto building the API. The initial GET events endpoint didn't initially return the nested data for markets and contracts, so I updated the query.

To make it better, I'd use RTK with OpenAI to generate the schema and add it here, so the dashboard can be in sync with the backend. With RTK, I can better handle the CRUD operations and managing state better.

I would have liked to make more features, but the thinking about how to design the UI with the data took some time.