#include <stdio.h>

int main()
{
    char c = 'A';
    char str[100] = "embedded Systems";
    int id = 1234;
    float temp = 28.5;

    FILE *fp = fopen("sensor.txt", "w");

    if (fp == NULL)
    {
        printf("file opem failed \n");
        return 1;
    }
    fputc(c, fp);
    fputc('\n', fp);

    fputs(str, fp);
    fputs("\n", fp);

    fprintf(fp, "sensor id :: %d\n", id);
    fprintf(fp, "temp  :: %f\n", temp);

    
    fputs("Hello, my name is Jagadeesh.\n", fp);
    fputs("I am learning C file operations.\n", fp);
    fputs("Today I am practicing fwrite and fputs.\n", fp);
    fputs("File handling is an important topic in C.\n", fp);
    fclose(fp);
    return 0;
}