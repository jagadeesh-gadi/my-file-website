#include <stdio.h>

int main()
{

    char c = 'c';

    const char *ptr = &c;

    // printf("before \n");
    printf("character  :: %c\n", *ptr);
    printf("address :: %p\n", (void *)ptr);
    // *ptr = 'D'; //cannot change the value using the pointer value

    c = 'D';
    printf("character :: %c \n", c);
    return 0;
}