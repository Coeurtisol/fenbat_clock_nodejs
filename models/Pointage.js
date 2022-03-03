import prisma from "./Prisma.js";

const { pointage, user } = prisma;

export default class Pointage {
  constructor(date, userId, moment) {
    this.date = new Date(date);
    this.moment = moment;
    this.valeur = 0;
    this.userId = userId;
  }

  // save = async () => {
  //   const data = await pointage.create({
  //     data: {
  //       hour: this.hour,
  //       userId: this.userId,
  //       motifAbsenceId: this.motifAbsenceId,
  //       affaireId: this.affaireId,
  //       entiteId: this.entiteId,
  //       semaineId: this.semaineId,
  //     },
  //   });
  //   console.log("save pointage", data);
  //   return data;
  // };

  // static update = async ({ id, pointageFin }) => {
  //   const data = await pointage.update({
  //     where: {
  //       id
  //     },
  //     data: {
  //       sessionEnd:pointageFin,
  //     },
  //   });
  //   console.log("update pointage", data);
  //   return data;
  // };

  static update = async (id, updatedPointage) => {
    const data = await pointage.update({
      where: {
        id,
      },
      data: updatedPointage,
    });
    // console.log("update pointage", data);
    return data;
  };

  static createWeekDays(week) {
    const januaryFour = new Date(new Date().getFullYear(), 0, 4);
    const firstDayOfFirstWeek = new Date(januaryFour);
    firstDayOfFirstWeek.setDate(
      firstDayOfFirstWeek.getDate() - firstDayOfFirstWeek.getDay() + 1
    );
    const manipulatedDate = new Date(firstDayOfFirstWeek);
    manipulatedDate.setDate(manipulatedDate.getDate() + (week - 1) * 7);
    const weekDays = [];
    manipulatedDate.setDate(
      manipulatedDate.getDate() - manipulatedDate.getDay() + 1
    );
    for (var i = 0; i < 7; i++) {
      weekDays.push(new Date(manipulatedDate));
      manipulatedDate.setDate(manipulatedDate.getDate() + 1);
    }
    return weekDays;
  }

  static findUsersPointagesSinceDate = async (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - 1);
    const today = new Date();
    const data = await user.findMany({
      where: {
        status: true,
        // id: 6,
      },
      orderBy: {
        firstname: "asc",
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        pointages: {
          where: {
            date: {
              gte: start,
              lte: today,
            },
          },
          orderBy: {
            date: "asc",
          },
          select: {
            date: true,
            motifAbsenceId: true,
            valeur: true,
            semaine: {
              select: {
                annee: true,
                numero: true,
              },
            },
          },
        },
      },
    });
    return data;
  };
}
