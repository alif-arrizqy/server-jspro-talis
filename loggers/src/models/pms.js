import prisma from "../app.js"
import moment from "moment-timezone"
import { tsFormatter } from "../helpers/timestampFormatter.js"
import { pmsLoggersNull, pmsCellNull } from "../helpers/nullValue"

const findPvId = async () => {
  try {
    return await prisma.pv.findUnique({
      where: { id: 1 },
    })
  } catch (error) {
    console.error("Error finding pv id:", error)
    return false
  }
}

const findEnergyId = async () => {
  try {
    return await prisma.energy.findUnique({
      where: { id: 1 },
    })
  } catch (error) {
    console.error("Error finding energy id:", error)
    return false
  }
}

const firstDataNullPv = async () => {
  try {
    return await prisma.pv.create({
      data: {
        pv1Curr: null,
        pv1Volt: null,
        pv2Curr: null,
        pv2Volt: null,
        pv3Curr: null,
        pv3Volt: null,
      },
    });
  } catch (error) {
    console.error("Error inserting null pv data:", error)
    return false
  }
}

const firstDataNullEnergy = async () => {
  try {
    return await prisma.energy.create({
      data: {
        edl1: null,
        edl2: null,
        edl3: null,
        eh1: null,
        eh2: null,
        eh3: null,
      },
    });
  } catch (error) {
    console.error("Error inserting null energy data:", error)
    return false
  }
}