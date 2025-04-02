import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class TeamsService {
  constructor(
    private readonly prisma : PrismaService
  ){}
  create(createTeamDto: CreateTeamDto) {
    return 'This action adds a new team';
  }

  async findAll(res : Response) {
    const teams = await this.prisma.team.findMany();
    const teamsWithUserName = await Promise.all(
      teams.map(async (team)=>{
        const productOwner = await this.prisma.user.findUnique({
          where : {
            userId : team.productOwnerUserId!
          },
          select : {
            username : true
          }
        })

        const projectManager = await this.prisma.user.findUnique({
          where : {
            userId : team.projectManagerUserId!
          },
          select : {
            username : true
          }
        })

        return {
          ...team,
          productOwnerUserName : productOwner?.username,
          projectManagerUserName : projectManager?.username
        }
      })
    )
    return res.json({
      data : teamsWithUserName
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
