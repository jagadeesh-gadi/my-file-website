#include <stdio.h>

float traingle(float a, float b, float c)

{
    // 2 sides was smaller than third side and 3rd side was larger than 2 sides
    if ((a * a) && (b * b) == (c * c) || (b * b) && (c * c) == (a * a) || (c * c) && (a * a) == (b * b))
    {

        printf("right angle triangle \n ");
    }
    //  any 2 sides need to be equal then it was equal traingle
    else if (a == b && b == c)

    {
        printf("the triangle is equlatural \n");
    }
    // one side is equal to another side the it was isolated traingle
    else if (a == b || b == c || c == a)
    {

        printf("trinagle is isolated \n");
    }
    else
    {
        printf("traingle is  isclone \n");
    }
}
float area(float a, float b, float c)
{
    // area of triangle formula
    float s, area;
    s = (a + b + c) / 2;
    area = (s * (s - a) * (s - b) * (s - c));
    printf("area of triangle :: %f\n", area);
}
int main()
{
    float a, b, c;
    printf("enter the values :: ");
    scanf("%f%f%f", &a, &b, &c);
    if (a < b + c && b < a + c && c < a + b)
    {
        traingle(a, b, c);
        area(a, b, c);
    }
    else
    {
        printf("triangle was not formed\n");
    }

    return 0;
}