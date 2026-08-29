#include <stdio.h>

int pointer_address(int *ptr)
{

    printf(" pointer variable address  :: %d\n", *ptr);
}
int var_address(int *ptr)
{
    printf(" address of variable :: %p\n", (void *)ptr);
}
int display_address_pointer(int **ptr)
{
    printf("Address of pointer :: %p\n", (void **)ptr);
}
// int display_address_pointer_pointer(int ***ptr)
// {
//     printf("Address of pointer_pointer :: %p\n", (void ***)ptr);
// }
int main()
{
    int a = 5;
    int *ptr = &a;

    pointer_address(ptr);
    var_address(ptr);
    display_address_pointer(&ptr);
    // display_address_pointer_pointer(&ptr);

    return 0;
}