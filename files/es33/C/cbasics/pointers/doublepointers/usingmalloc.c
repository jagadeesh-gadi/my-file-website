#include <stdio.h>
#include <stdlib.h>
void allocate_memory(int **ptr)
{

    *ptr = malloc(3 * sizeof(int));
    if (*ptr == NULL)
        return;
    (*ptr)[0] = 10;
    (*ptr)[1] = 20;
    (*ptr)[2] = 30;
}
void modify_pointer(int **ptr)
{
    static int x = 100;
    *ptr = &x;
}
int main()
{
    int *p = NULL;
    printf("\nbefore alloction \n");
    printf("p= %p \n", (void *)p);

    allocate_memory(&p);
    printf("\nafter alloction  \n");
    printf("p = %p\n ", (void *)p);

    if (p != NULL)
    {
        printf("\nP[0] = %d\n", p[0]);
        printf("P[1] = %d\n", p[1]);
        printf("P[2] = %d\n", p[2]);

        printf("\naddress of all pointers\n");

        printf("\nP[0] = %p\n", (void *)&p[0]);
        printf("P[1] = %p\n", (void *)&p[1]);
        printf("P[2] = %p\n", (void *)&p[2]);
    }
    modify_pointer(&p);
    printf("\nmodify the pointer \n");
    printf("p = %d\n", *p);
    printf("p = %p\n", (void *)p);

    return 0;
}