
#include <stdio.h>
// global structure
struct sensor
{
    int id;
    float temp;
};
void sensor_test()
{
    struct sensor s = {201, 90.090};
    printf("global values ::\n");
    printf("global id :: %d\n", s.id);
    printf("global temp :: %f\n", s.temp);
}
void test()
{
    // struct device d;   //error outside of local not occur
    // printf("id :: %d \n", d.id);  //error will occur with in local only it will come
}
int main()
{
    // local structure in main
    struct devic
    {
        int id;
        float temp;
    };

    struct devic d = {101, 809.090};
    printf("local values \n");
    printf("local id :: %d\n", d.id);
    printf("local temp :: %f\n", d.temp);
    sensor_test();
    return 0;
}