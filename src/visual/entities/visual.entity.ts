import { MeasurementType } from 'src/measurement-types/entities/measurement-type.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';
@Entity()
export class Visual {
    @Column({ primary: true, generated: true })
    id: number;
    @Column()
    serverName: string;
    @Column()
    serverIp: string;
    @Column()
    serverPort: number;
   

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => MeasurementType, (measurementType) => measurementType.id,{
        eager: true,
    })
    measurementType: MeasurementType;

}
