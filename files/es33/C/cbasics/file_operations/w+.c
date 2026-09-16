#include <stdio.h>

int main()
{
    FILE *fp;
    fp = fopen("some.txt", "w+");

    if (fp == NULL)
    {
        printf("open to fail\n");
        return 1;
    }

    puts("loding values \n");
    fclose(fp);
    return 0;
}