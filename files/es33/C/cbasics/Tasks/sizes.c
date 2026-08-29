#include <stdio.h>

int main()
{
    printf("size of char = %zu bytes\n", sizeof(char));
    printf("size of unsigned char = %zu bytes\n", sizeof(unsigned char));
    printf("size of int = %zu bytes\n", sizeof(int));
    printf("size of unsigned int = %zu bytes\n", sizeof(unsigned int));
    printf("size of signed int = %zu bytes\n", sizeof(signed int));
    printf("size of short int = %zu bytes\n", sizeof(short int));
    printf("size of long int = %zu bytes\n", sizeof(long int));
    printf("size of long long int = %zu bytes\n", sizeof(long long int));
    printf("size of float = %zu bytes\n", sizeof(float));
    printf("size of double = %zu bytes\n", sizeof(double));
    printf("size of long double = %zu bytes\n", sizeof(long double));

    return 0;
}