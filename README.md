<div align="center">
  <a href="https://github.com/Alamin02/pluto/">
    <h1>Pluto</h1>
  </a>

A lightweight eCommerce application (not the dwarf planet).

[![GitHub issues](https://img.shields.io/github/issues/Alamin02/pluto?style=flat-square)](https://github.com/Alamin02/pluto/issues)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Alamin02/pluto?style=flat-square)
[![GitHub stars](https://img.shields.io/github/stars/Alamin02/pluto?style=flat-square)](https://github.com/Alamin02/pluto/stargazers)
![GitHub contributors](https://img.shields.io/github/contributors/Alamin02/pluto?style=flat-square)

<a href="#✨-key-features">✨ Key Features</a> •
<a href="#🛠️-development">🛠️ Development</a> •
<a href="#🤝-contributors">🤝 Contributors</a> •
<a href="#⚖️-license">⚖️ License</a>

</div>

## ✨ Key Features

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

## 🛠️ Development

Prerequisites:

- [Node.js]() v12.0+
- [Yarn]() v1.22.0+

The below commands can be used to install the dependencies & run it locally:

```sh
# Clone repository
git clone https://github.com/Alamin02/pluto.git

# Change directory
cd pluto

# Install dependencies
yarn

# Start the pluto store server
yarn start:frontend
```

In browser at `http://localhost:3000/` the `frontend` of `Pluto` will open.
Since there's no server to serve data from `backend`, no products will be shown yet.

Before starting the backend, first go to **backend** folder and create a `.env` file with the configs like shown in `.env.example`. For storing images you need a `Cloudinary` account. After creating an account in [cloudinary](https://cloudinary.com/users/register/free), go to [cloudinary console](https://cloudinary.com/console) and there you will find `cloudinary` related configs there.

```sh
# JWT
JWT_SECRET=

# Cloudinary
CLOUD_NAME=
API_KEY=
API_SECRET=
```

To get started fast with mock data, run the following commands to start the **backend** server:

```sh
# Start the pluto backend server
yarn start:backend

# Seed products data
yarn seed:products
```

In browser at `http://localhost:3000/` refresh the page to see the products.

All the data served to `Pluto` store can be managed via `admin` panel. Run the following commands to start admin panel:

```sh
# Start the pluto admin server
yarn start:admin

# Would you like to run the app on another port instead? » (Y/n)
y
```

To log in to the admin panel run the following command to generate admin credentials.

```sh
# Create admin account from command line
yarn create:admin --email=test_email@email.com --password=test_password
```

Replace `test_email@email.com` and `test_password` with your preferred email and password. Use these credentials to log in to the `admin` panel.

_⚠️ Using `yarn` instead of `npm` is advised_

## 🤝 Contributors

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

## ⚖️ License

_License will be added prior to first release_
