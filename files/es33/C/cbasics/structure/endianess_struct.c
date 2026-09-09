#include <stdio.h>

// {
//     unsigned int i = 0x12345678;
//     char *c = (char *)&i;
//     if (*c)
//         printf("litte endianess \n");
//     else
//         printf("Big endianess \n");
//     return 0;
// }
struct data
{
    char c;
    int m;
};
int main()
{
    struct data c = {'B', 0x12345678};
    unsigned char *pc = (unsigned char *)&c.c;
    unsigned char *p = (unsigned char *)&c.m;
    printf("char bytes \n");
    for (int i = 0; i < sizeof(c.c); i++)
    {
        printf("%02x\n", pc[i]);
    }
    printf("int bytes \n");
    for (int i = 0; i < sizeof(c.m); i++)
    {
        printf("%02x", p[i]);
    }
    printf("\n");
}
