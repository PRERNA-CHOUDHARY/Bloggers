import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet  from "helmet";
import morgan from "morgan";
import  path from "path";    // set path when directry configered
import { fileURLToPath } from "url";


/* CONFIGRATION */
const __filename=fileURLToPath(import.meta.url)  //grab file url in module
const __dirname=path.dirname(__filename)  // grab directory name