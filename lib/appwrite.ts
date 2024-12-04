"use client";

import { Client, Account } from "appwrite";

const client = new Client();

client
 .setEndpoint("http://localhost:9999/v1") // Ganti dengan endpoint Appwrite Anda
 .setProject("674bfd61003a232b0a72"); // Ganti dengan project ID Appwrite Anda

export const account = new Account(client);
