
#include <stdio.h>
#include <string.h>

int main()
{
    char str[100];
    char ch;
    int a;
    int num;
    long position;

    FILE *fp;

    /* fopen - write */
    fp = fopen("text.txt", "w");

    if (fp == NULL)
    {
        printf("Failed to open file\n");
        return 1;
    }

    /* fputs - write string */
    fputs("Hello, this is C file handling.\n", fp);
    fputs("I am learning file operations.\n", fp);

    /* fputc - write character */
    fputc('A', fp);
    fputc('\n', fp);

    /* fprintf - write formatted data */
    fprintf(fp, "Temperature: %d Celsius\n", 30);

    /* fwrite - write block of data */
    char data[] = "This data is written using fwrite.\n";
    fwrite(data, sizeof(char), 5, fp);

    /* fclose */
    fclose(fp);

    /* fopen - read */
    fp = fopen("text.txt", "r");

    if (fp == NULL)
    {
        printf("Failed to open file\n");
        return 1;
    }

    /* fscanf - word by word */
    printf("\n========= Using fscanf =========\n");

    while (fscanf(fp, "%99s", str) == 1)
    {
        printf("%s\n", str);
    }

    /* rewind - move to beginning */
    rewind(fp);

    /* fgetc - character by character */
    printf("\n========= Using fgetc =========\n");

    while ((a = fgetc(fp)) != EOF)
    {
        printf("%c", a);
    }

    /* rewind */
    rewind(fp);

    /* fgets - line by line */
    printf("\n========= Using fgets =========\n");

    while (fgets(str, sizeof(str), fp) != NULL)
    {
        printf("%s", str);
    }

    /* ftell - current position */
    position = ftell(fp);

    printf("\nCurrent file position: %ld\n", position);

    /* fseek - move to beginning */
    fseek(fp, 0, SEEK_SET);

    printf("\n========= After fseek =========\n");

    fgets(str, sizeof(str), fp);
    printf("%s", str);

    fclose(fp);

    /* fopen - append */
    fp = fopen("text.txt", "a");

    if (fp == NULL)
    {
        printf("Failed to open file\n");
        return 1;
    }

    fputs("This line was added using append mode.\n", fp);

    fclose(fp);

    /* fopen - r+ */
    fp = fopen("text.txt", "r+");

    if (fp == NULL)
    {
        printf("Failed to open file\n");
        return 1;
    }

    printf("\n========= Using r+ =========\n");

    fgets(str, sizeof(str), fp);
    printf("%s", str);

    fclose(fp);

    return 0;
}
