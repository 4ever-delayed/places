# Places app
version : 1.0.0
## How to develop the app

**Initialize the environment**

1\. Clone the repository:

```bash
git clone https://github.com/oshusha/places.git
cd places
```

2\. Checkout to the develop branch:

```bash
git checkout develop
```

2\. Install the dependencies:

```bash
npm install
```


**Launch the app**
1\. Import to mongodb users and cards
```bash
npm run import
```
2\. Run the development server 

In development mode with hot reload:
```bash
npm run dev
```
In production mode:
```bash
npm run start
```

2\. Open [localhost:3000](http://localhost:3000) to see the live app.



`By default, this app runs on port 3000.
To change the default port the nodejs app instance is listening on, 
simply export the env variable before start the app:`

ex:
```bash
export PORT=3333
npm run start
```

[DEMO](https://oshusha.github.io/places/)



