/*sizes of the each datatypes in c like int,float,char,double*/

#include<stdio.h>
int main(){


    // Determine and Print the size of int
 printf("Size of int: %lu bytes\n", sizeof(int));
  printf("Size of unsigned int: %lu bytes\n", sizeof(unsigned int));
   printf("Size of unsiged short int: %lu bytes\n", sizeof(unsigned short int));
   printf("Size of unsiged long int : %lu bytes\n", sizeof(unsigned long int));

   printf("Size of signed int: %lu bytes\n", sizeof(signed int));
      printf("Size of siged short int: %lu bytes\n", sizeof(signed short int));
   printf("Size of siged long int: %lu bytes\n", sizeof(signed long int));

    // Determine and Print the size of float
    printf("Size of float: %lu bytes\n", sizeof(float));

    // Determine and Print the size of double
    printf("Size of double: %lu bytes\n", sizeof(double));
    printf("Size of long double: %lu bytes\n", sizeof(long double));

    // Determine and Print the size of char
    printf("Size of char: %lu bytes\n", sizeof(char));
    return 0;
}

