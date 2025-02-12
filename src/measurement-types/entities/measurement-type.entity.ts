import { Visual } from 'src/visual/entities/visual.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class MeasurementType {
    @Column({ primary: true, generated: true })
    id: number;
    @Column()
    name: string;

    @OneToMany(() => Visual, (visual) => visual.measurementType)
    visuals: Visual[];
}
