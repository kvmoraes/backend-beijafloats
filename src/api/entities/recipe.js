
@Entity("recipe")
class Recipe {
  @PrimaryGeneratedColumn("increment")
  id?: ;

  @Column("varchar", { length: 100, nullable: false })
  nome: ;
  @Column("varchar", { length: 100, nullable: false })
  preco: ;

  @Column()
  count: ;
}

export default Recipe;