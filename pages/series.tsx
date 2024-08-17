import GridSeries from '@/components/GridSeries';
import Navbar from '@/components/Navbar';

export default function series () {
    return (
        <section className="seriesPage">
            <Navbar />
            <h1>Les series !!!</h1>
            <GridSeries />
        </section>
    )
}
