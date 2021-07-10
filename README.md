<div align="center">
  <h1>Pluto</h1>

A lightweight eCommerce application (not the dwarf planet).

[![GitHub issues](https://img.shields.io/github/issues/Alamin02/pluto)](https://github.com/Alamin02/pluto/issues)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Alamin02/pluto)
[![GitHub stars](https://img.shields.io/github/stars/Alamin02/pluto)](https://github.com/Alamin02/pluto/stargazers)
![GitHub contributors](https://img.shields.io/github/contributors/Alamin02/pluto)

</div>

## Table of Contents

- [Key Features](#key-features)
- [Development](#development)
- [Contributors](#contributors)
- [License](#license)

## Key Features

- Monolithic repo containing **store**, **backend** & **admin** all together.

```
├── admin
├── backend
└── store
```

- **store** follows the `MVC` architecture.
- **store** and **admin** are built using `Ant Design` for consistent UI design.
- **backend** is written in `TypeScript` for predictable static types.

<details><summary><b>Show screenshots</b></summary>

_Screenshots will be added prior to first release_

</details>

## Development

### Prerequisites:

- [Node.js]() v12.0+
- [Yarn]() v1.22.0+

### Install & development:

_⚠️ Using `yarn` instead of `npm` is advised._

```sh
# Clone repository
git clone https://github.com/Alamin02/pluto.git

# Change directory
cd pluto

# Install dependencies
yarn
```

Create a `.env.local` file similar to [`.env.example`](https://github.com/Alamin02/pluto/blob/master/.env.example). Get [cloudinary](https://cloudinary.com) related config from [cloudinary console](https://cloudinary.com/console).

```sh
# Start the backend server
yarn start:backend

# Start the store(client end) server
yarn start:store

# Start the admin server
yarn start:admin
```

Run the following command to generate credentials for admin panel login. Replace `test_email@example.com` and `test_password` with your preferred email and password.

```sh
# Create admin account
yarn create:admin --email=test_email@example.com --password=test_password
```

## Contributors

Organized _alphabetically_

<table>
<tr>
<td align="center">

[![](https://github.com/farhan2077.png?size=50)](https://github.com/farhan2077)

Farhan Bin Amin

</td>
<td align="center">

[![](https://github.com/Alamin02.png?size=50)](https://github.com/Alamin02)

Md. Al Amin

</td>
<td align="center">

[![](https://github.com/MehediHasan06.png?size=50)](https://github.com/MehediHasan06)

Mehedi Hasan

</td>
<td align="center">

[![](https://github.com/raihankabir36850.png?size=50)](https://github.com/raihankabir36850)

Raihan Kabir Rifat

</td>
<td align="center">

[![](https://github.com/wali39.png?size=50)](https://github.com/wali39)

Wali Ullah

</td>
</tr>
</table>

## License

[GPL-3.0 License](./LICENSE)
