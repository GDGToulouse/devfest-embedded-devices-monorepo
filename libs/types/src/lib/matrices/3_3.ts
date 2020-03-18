import { Matrice1_3 } from './1_3';

export type Matrice3_3<X1_1, X1_2, X1_3, X2_1, X2_2, X2_3, X3_1, X3_2, X3_3> = Matrice1_3<Matrice1_3<X1_1, X1_2, X1_3>, Matrice1_3<X2_1, X2_2, X2_3>, Matrice1_3<X3_1, X3_2, X3_3>>;
