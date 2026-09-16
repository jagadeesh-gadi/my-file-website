#include <stdio.h>

int main()
{
    FILE *source;
    FILE *des;

    int a;

    source = fopen("source.txt", "r");
    if (source == NULL)
    {
        printf("fail to open file ");
        return 1;
    }

    des = fopen("des.txt", "w");
    if (des == NULL)
    {
        printf("fail to open dest");
        return 1;
    }

    while ((a = fgetc(source)) != EOF)
    {
        fputc(a, des);
    }
    fclose(source);
    fclose(des);

    return 0;
}