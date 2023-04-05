# TypeScript-Window-UserList

A TypeScript Project getting the Usernames from `net user` and then gets the full name and the global classes by `net user <username>`. You can also check my Inspiration from [WindowsUserList](https://github.com/filip326/WindowsUserList), which does nearly the same in C# (.Net).

## Use

Edit the .ENV to your System-Lang. For German it's:

```env
NAME_QUERY = Vollst�ndiger Name
CLASS_QUERY = Globale Gruppenmitgliedschaften
RETURN_NULL_CLASS = "*Kein"
```

```bash
npm i
npm run start
```

Type *1*, if you'd like to have the `/domain` at the end of the `net user /domain`. Else type *2*.
You get a JSON-File (`./users.json`) as an output.
