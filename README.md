# TypeScript Window UserList

Log the Global Classes and the fullname of all users of your Windows PC or your Windows Domain Network

## Installation

Edit the .ENV to your System-Lang. For German it's:

```env
NAME_QUERY = Vollst�ndiger Name
CLASS_QUERY = Globale Gruppenmitgliedschaften
RETURN_NULL_CLASS = "*Kein"
```

Next run:

```bash
npm i
# if you want it to run with ts-node run:
npm run start-ts 
# if you want it to run with node run:
npm run start-js
```
