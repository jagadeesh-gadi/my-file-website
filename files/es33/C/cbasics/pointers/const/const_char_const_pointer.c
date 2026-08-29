#include <stdio.h>

int main()
{
    char c = 'c';
    char d = 'd';

    const char *const ptr = &c;

    printf("intial values \n");
    printf("char :: %c\n", *ptr);
    printf("address :: %p \n", (void *)ptr);

    // *ptr = 'f';  //here we cannot change the values once we declare const keyword

    // ptr = &d;  //here the pointer was const cannot be changed the address
    printf("addrese : %p\n", (void *)ptr);
    return 0;
}