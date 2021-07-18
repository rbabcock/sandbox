package main

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha512"
	"fmt"
)

func main() {

	//GENERATE PRIVATE KEY
	privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	if err != nil {
		panic(err)
	}

	//GRAB PUBLIC KEY
	publickey := privateKey.PublicKey

	//ENCRYPT
	encryptedBytes, err := rsa.EncryptOAEP(
		sha512.New(),
		rand.Reader,
		&publickey,
		[]byte("TESTING ENCRYPTION MESSAGE"),
		nil,
	)

	if err != nil {
		panic(err)
	}

	fmt.Println("encryption bytes: ", encryptedBytes)

	//DECRYPT
	decryptedBytes, err := privateKey.Decrypt(nil, encryptedBytes, &rsa.OAEPOptions{Hash: crypto.SHA512})
	if err != nil {
		panic(err)
	}

	fmt.Println("decryptedBytes: ", string(decryptedBytes))

	msg := []byte("verifiable message")

	msgHash := sha512.New()

	_, err = msgHash.Write(msg)

	if err != nil {
		panic(err)
	}

	msgHashSum := msgHash.Sum(nil)
	signature, err := rsa.SignPSS(rand.Reader, privateKey, crypto.SHA512, msgHashSum, nil)
	if err != nil {
		panic(err)
	}

	err = rsa.VerifyPSS(&publickey, crypto.SHA512, msgHashSum, signature, nil)
	if err != nil {
		fmt.Println("could not verify signature: ", err)
		return
	}

	fmt.Println("signature verified")
}
