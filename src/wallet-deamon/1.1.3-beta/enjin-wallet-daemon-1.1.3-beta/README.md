# enjin-wallet-daemon

The Enjin Wallet Daemon is a tool to help game developers perform transactions on the Ethereum network
without having to validate them on a mobile wallet.

Here are the intended setups:

* Private Linux server _somewhere_ (no need for public access)
* Windows machine (a lead programmer or build specialist's machine)
* Mac machine for indie devs that have no reason to buy more stuff.

This tool could be useful in various scenarios:

* Minting and transfers to players during a play session
* Speed of work when using the various SDKs (Unity, Unreal, Godot, etc.)
* Auction house

Right now, the wallet manages a single TP identity.

It's initialized by running it 3 times:

* `enjin_wallet_daemon account new` (you can also import a private key)
* `enjin_wallet_daemon link <CODE>`
* `enjin_wallet_daemon`

Each time, it asks you for a password. It's to encrypt storage. Choose one and always use it :slightly_smiling_face:
Storage is in `%LOCALAPPDATA%\enjin-wallet-daemon`
